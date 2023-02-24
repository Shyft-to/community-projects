
const TokenTransfer = ({styles,id}) => {
    
    const togglePanel = (div_id) => {
        const displayType = document.getElementById(div_id).style.height;
        console.log(displayType);
        if(displayType === '0px')
            document.getElementById(div_id).style.height = "auto";
        else
            document.getElementById(div_id).style.height = "0px";

    }

    return ( 
        <div>
            <div className={styles.each_txn}>
                <div className={styles.toggle_button}>
                    <button onClick={() => togglePanel(id)}>Close</button>
                </div>
                <div className={styles.fieldset_1}>
                    <div className="d-flex flex-wrap justify-content-between">
                        <div style={{width:"100px", height:"100px", backgroundColor:"pink"}}></div>
                        <div style={{width:"200px", height:"100px", backgroundColor:"red"}}></div>
                        <div style={{width:"100px", height:"100px", backgroundColor:"blue"}}></div>
                        <div style={{width:"200px", height:"100px", backgroundColor:"green"}}></div>
                        <div style={{width:"100px", height:"100px", backgroundColor:"aqua"}}></div>
                    </div>
                </div>
                <div>
                    {/* <div id={id} className={styles.fieldset_2} style={{display:"none",transition:"all 0.8s ease"}}>
                        <div style={{width:"100%", height:"200px", backgroundColor:"pink"}}>

                        </div>
                    </div> */}
                    <div id={id} className={styles.fieldset_2} style={{height:"0px",transition:"all 3s ease"}}>
                        <div style={{width:"100%", height:"200px", backgroundColor:"pink"}}>

                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
 
export default TokenTransfer;