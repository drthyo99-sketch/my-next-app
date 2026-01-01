'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Guestbook() {
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState<any[]>([])

    // 글 가져오기 함수
    const fetchMessages = async () => {
        const { data } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false })
        if (data) setMessages(data)
    }

    useEffect(() => { fetchMessages() }, [])

    // 글 쓰기 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        const { error } = await supabase
            .from('guestbook')
            .insert([{ content }])

        if (error) {
            alert("오류 발생: " + error.message)
        } else {
            setContent('')
            fetchMessages() // 목록 새로고침
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>방명록</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    style={{ width: '80%', padding: '10px', color: 'black' }}
                />
                <button type="submit" style={{ padding: '10px' }}>등록</button>
            </form>
            <hr />
            <ul>
                {messages.map((m) => (
                    <li key={m.id} style={{ marginBottom: '10px' }}>
                        {m.content} <br />
                        <small>{new Date(m.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}