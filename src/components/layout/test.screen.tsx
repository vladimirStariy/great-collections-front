const TestScreen = () => {
    const handleCheck = () => {
        console.log(process.env.REACT_APP_BASE_URL)
    }
    
    return <>
        <button onClick={handleCheck}>asd</button>
    </>
}

export default TestScreen;