
const withLogger = (ComponentWithLogs) =>{
    return(props) => {
        const logs = (action) =>{
            console.log(action);
        }
        
        return <ComponentWithLogs {...props} logs={logs}/>
    }
}

export default withLogger;