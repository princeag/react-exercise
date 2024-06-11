import {useState} from 'react'

const faqs = [
    {
        'question': 'What is react?',
        'answer': 'React is a javascript library to create UI of any web or mobile application.'
    },
    {
        'question': 'What is vite?',
        'answer': 'Vite is a build tool for react which create react app very fast.'
    },
    {
        'question': 'What is node.js?',
        'answer': 'Node.js is a javascript runtime environment to execute javascript on server side.'
    },
    {
        'question': 'What is python?',
        'answer': 'Python is a programming language to create software application or web server.'
    },
]

export default function Accordion() {
    const [activeFaq, setActiveFaq] = useState(0);

    function handleClick(i) {
        setActiveFaq(i)
    }

    return (
        <div>
            <h1>FAQ/Accordion</h1>
            <section className='accordion-wrapper'>
                {faqs.map((faq, i)=> (
                    <div key={i} className={'faq'+(activeFaq === i ? ' active' : '')}>
                        <h2 onClick={()=> handleClick(i)}>{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}