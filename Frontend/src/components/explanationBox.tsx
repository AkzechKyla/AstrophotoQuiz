import SubmitButton from  '../components/submitButton'

interface ExplanationBoxProps {
  userExplanation: string,
  setUserExplanation: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

function ExplanationBox(props: ExplanationBoxProps) {
  return <>
      <p>Explain the logic behind your answer</p>
      <textarea
        placeholder="Explain your answer..."
        value={props.userExplanation}
        onChange={(e) => props.setUserExplanation(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') props.handleSubmit();
        }}
        className='w-11/12 p-2.5 m-2.5 text-base rounded-md border text-black'
      />
      <SubmitButton handleSubmit={props.handleSubmit}/>
  </>
}

export default ExplanationBox;
