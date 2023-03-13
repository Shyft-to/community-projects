import poweredBy from './resources/images/footer/powered-by.svg';
import gmail from './resources/images/footer/gmail.svg';
import discord from './resources/images/footer/discord.svg';
import linkedin from './resources/images/footer/lnkedin.svg';
import twitter from './resources/images/footer/twitter.svg';
import github from './resources/images/footer/github.svg';


const Footer = () => {
    return ( 
    <div>
        <div className="footer-white">
                <div className="d-flex justify-content-center my-2">
                    <div style={{fontFamily: "Poppins",letterSpacing: "1px"}}>
                        <a href="https://docs.shyft.to/" target="_blank" rel='noreferrer'>
                            <img src={poweredBy} alt="Powered By SHYFT" />
                        </a>
                    </div>
                </div>
                <div className='d-flex justify-content-center my-3 white-footer-icons'>
                    <div className=''>
                        <a href="mailto:team@shyft.to">
                            <img src={gmail} alt="Mail Us" />
                        </a>
                    </div>
                    <div className=''>
                        <a href="https://www.linkedin.com/company/shyft-to/" target="_blank" rel="noreferrer">
                            <img src={linkedin} alt="Find Us" />
                        </a>
                    </div>
                    <div className=''>
                        <a href="https://twitter.com/shyft_to" target="_blank" rel="noreferrer">
                            <img src={twitter} alt="Tweet" />
                        </a>
                    </div>
                    <div className=''>
                        <a href="https://discord.gg/8JyZCjRPmr" target="_blank" rel='noreferrer'>
                            <img src={discord} alt="Join Server" />
                        </a>
                    </div>
                    <div className=''>
                        <a href="https://github.com/Shyft-to" target="_blank" rel='noreferrer'>
                            <img src={github} alt="Clone Our Code" />
                        </a>
                    </div>
                </div>
           </div> 
    </div> 
    );

}
 
export default Footer;