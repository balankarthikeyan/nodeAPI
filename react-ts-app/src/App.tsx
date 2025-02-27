import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { useDispatch } from 'react-redux'
import { addCustomer as addCustomerAction } from './features/customerSlice'
import Camera from './Camera'

let lryics = `

Every night in my dreams
I see you. I feel you.
That is how I know you go on.

Far across the distance
And spaces between us
You have come to show you go on.

Near, far, wherever you are
I believe that the heart does go on
Once more you open the door
And you're here in my heart
And my heart will go on and on

Love can touch us one time
And last for a lifetime
And never go till we're one

Love was when I loved you
One true time I hold to
In my life we'll always go on

Near, far, wherever you are
I believe that the heart does go on
Once more you open the door
And you're here in my heart
And my heart will go on and on

There is some love that will not
go away

You're here, there's nothing I fear,
And I know that my heart will go on
We'll stay forever this way
You are safe in my heart
And my heart will go on and on 

`
const Header = () => {
  const [getSynth, setSynth] = React.useState(window.speechSynthesis)
  const [getText, setText] = React.useState(lryics)
  const onTalk = () => {
    const highlight = (text: any, from: any, to: any) => {
      let replacement = highlightBackground(text.slice(from, to))
      return text.substring(0, from) + replacement + text.substring(to)
    }
    const highlightBackground = (sample: any) =>
      `<span style="background-color:yellow;">${sample}</span>`

    if (!getSynth) {
      console.error('no tts')
      return
    }
    let text = document.getElementById('text') as any
    let originalText = text.innerText
    let utterance = new SpeechSynthesisUtterance(originalText)
    utterance.addEventListener('boundary', (event) => {
      console.log('SPEAK>>')
      const { charIndex, charLength } = event
      text.innerHTML = highlight(
        originalText,
        charIndex,
        charIndex + charLength,
      )
    })
    getSynth.speak(utterance)
  }

  React.useEffect(() => {
    let document = window?.document as any
    const { webkitSpeechRecognition = () => '' } = window as any
    // Check for browser support
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition() // For Chrome and Safari
      // const recognition = new SpeechRecognition(); // Standard syntax, for other browsers

      recognition.continuous = true // Keep listening even after a pause
      recognition.interimResults = true // Get partial results

      let finalTranscript = ''

      recognition.onresult = (event: any) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
        document.getElementById('final').innerHTML = finalTranscript
        document.getElementById('interim').innerHTML = interimTranscript
        setText(finalTranscript)
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
      }

      recognition.onend = () => {
        console.log('Speech recognition ended')
      }

      document.getElementById('start').onclick = () => {
        finalTranscript = '' // Reset transcript
        recognition.start()
      }

      document.getElementById('stop').onclick = () => {
        recognition.stop()
      }
    } else {
      console.error('Speech recognition not supported in this browser.')
    }
  }, [])

  const renderOutput = () => {
    return (
      <>
        <div
          key={getText}
          id="text"
          style={{
            width: 400,
            fontSize: 13,
            padding: 20,
            margin: 20,
            lineHeight: 3,
          }}
        >
          {getText}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <button
            style={{ margin: 10 }}
            id="btn"
            type="button"
            onClick={onTalk}
          >
            Talk START
          </button>
          <button
            style={{ margin: 10 }}
            id="btn"
            type="button"
            onClick={() => {
              getSynth.cancel()
            }}
          >
            Talk STOP
          </button>
          <button
            style={{ margin: 10 }}
            id="btn"
            type="button"
            onClick={() => {
              getSynth.pause()
            }}
          >
            Talk Pause
          </button>
          <button
            style={{ margin: 10 }}
            id="btn"
            type="button"
            onClick={() => {
              getSynth.resume()
            }}
          >
            Talk RESUME
          </button>
        </div>
      </>
    )
  }

  const renderInput = () => {
    return (
      <div>
        <button id="start">Start</button>
        <button id="stop">Stop</button>
        <div id="final"></div>
        <div id="interim"></div>
      </div>
    )
  }
  return (
    <header className="App-header">
      {renderOutput()}
      <br />
      <br />
      <br />
      <br />
      {renderInput()}

      {/* <svg
        className="App-logo"
        width="450.22"
        height="390.565"
        viewBox="0 0 45.22 39.565"
      >
        <g transform="translate(375.199 -791.897)">
          <path
            id="Path_1"
            data-name="Path 1"
            d="M-375.2,803.7l6.662-7.576c1.134-1.289,2.26-2.584,3.412-3.857a1.071,1.071,0,0,1,.685-.353c3.283-.022,6.567-.015,9.85-.013a3,3,0,0,1,.341.042v39.45c-.178-.2-.3-.325-.4-.46q-5.741-7.6-11.477-15.207c-1.3-1.725-2.559-3.48-3.857-5.206a.621.621,0,0,1,.018-.85c.916-1.369,1.81-2.753,2.754-4.195-.2-.021-.354-.052-.508-.053-1.824,0-3.649-.024-5.472.011a1.16,1.16,0,0,1-1.162-.587C-374.585,804.463-374.884,804.122-375.2,803.7Zm17.787,1.722c-1.911,0-3.712,0-5.513.007a.611.611,0,0,0-.443.171c-.923,1.311-1.811,2.648-2.744,3.952-.29.405-.168.661.093,1,.931,1.2,1.834,2.424,2.75,3.637q2.694,3.57,5.39,7.138c.119.157.251.3.467.564Zm-.026-10.308c-1.835,0-3.613.014-5.389-.011a1.09,1.09,0,0,0-.926.433c-1.8,2.07-3.62,4.125-5.431,6.185-.107.122-.2.254-.358.447h12.1Z"
            transform="translate(0 0)"
            fill="#fff"
          ></path>
          <path
            id="Path_2"
            data-name="Path 2"
            d="M-186.769,831.715V792.188h3.147v10.224h12.161c-.657-.753-1.256-1.442-1.858-2.127-.807-.919-1.627-1.828-2.419-2.759a1.176,1.176,0,0,1-.291-.671c-.026-1.436-.013-2.872-.013-4.52l10.221,11.614c-.386.517-.729,1.036-1.139,1.5a1,1,0,0,1-.676.219c-1.824.017-3.648.009-5.473.009h-.762c.642.944,1.226,1.78,1.785,2.632.453.691,1.222,1.408,1.211,2.1-.01.669-.824,1.339-1.312,1.988q-3.285,4.369-6.586,8.726a1.353,1.353,0,0,1-.491.436v-.579c0-1.331-.022-2.662.015-3.991a1.85,1.85,0,0,1,.338-.984c1.3-1.772,2.63-3.525,3.969-5.269a.624.624,0,0,0,.039-.886c-.882-1.241-1.716-2.516-2.587-3.766-.12-.172-.34-.388-.517-.391-1.841-.029-3.683-.018-5.611-.018v.8c0,6.793.007,13.586-.018,20.378a2.269,2.269,0,0,1-.407,1.218C-184.887,829.275-185.8,830.43-186.769,831.715Z"
            transform="translate(-164.157 -0.254)"
            fill="#fff"
          ></path>
        </g>
      </svg>
      <h1>{`Karthikeyan Balan`}</h1> */}
      {/* <Camera /> */}
    </header>
  )
}
const AppComponent = () => {
  const dispatch = useDispatch() as any

  React.useEffect(() => {
    console.log('AppComponent?>>>>')
    dispatch(addCustomerAction('karthik'))
  }, [])

  return (
    <div className="App">
      <Header />
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )
}

export default App
