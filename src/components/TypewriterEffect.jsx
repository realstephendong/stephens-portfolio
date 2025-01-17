import React, { useState, useEffect } from 'react'

const TypewriterEffect = () => {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(200)

  const phrases = [
    'HelloWorld',
    "print('Hi')",
    'Greetings!',
    "printf('Hey');",
    "Howdy!",
    "What's up?",
    "Aloha!",
    "你好",
    "Bonjour!",
    "Ciao!"
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 133 : 200)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1600)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(400)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <span className="font-mono font-light text-7xl">
      {text}
      <span className="animate-blink">|</span>
    </span>
  )
}

export default TypewriterEffect