interface SubmitButtonProps {
    handleSubmit: () => void;
}

function SubmitButton({ handleSubmit }: SubmitButtonProps) {
    return(
        <button
            onClick={handleSubmit}
            className='block py-2.5 px-5 m-5 text-base rounded-md bg-[#4caf50] cursor-pointer'
        >Submit</button>
    )
}

export default SubmitButton;
