import { useEffect, useState } from "react"

export default function QuoteGenerator() {
    const [quotes, setQuotes] = useState([])
    const [quote, setQuote] = useState('')

    useEffect(()=>{
        fetch('https://type.fit/api/quotes')
        .then(results=> results.json())
        .then(json=> {
            setQuotes(json)
            setQuote(json[0])
        })    
    }, [])

    function handleClick() {
        let randomNo = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomNo])
    }

    const author = quote != '' ? quote.author.substr(0, quote.author.indexOf(',')) : ''

    return(
        <div className='quote-generator'>
            <h1>Quote Generator</h1>
            {quote != '' && (
                <>
                    <blockquote>
                        <p>{quote.text}</p>
                        <footer>- {author == '' ? 'anonymous' : author}</footer>
                    </blockquote>
                    <button className="btn" onClick={handleClick}>Next quote</button>
                </>
            )}
            
        </div>
    )
}