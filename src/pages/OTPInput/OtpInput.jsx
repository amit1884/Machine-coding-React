import { useRef, useState } from 'react'
import './styles.css'
const OtpInput=({length=6,setOtp})=>{
    const [localOtp,setLocalOtp]=useState(new Array(length).fill(''))
    const inputRefs=useRef([])
    const handleChange=(e,index)=>{
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...localOtp];
        newOtp[index]=value.substring(value.length - 1)
        setLocalOtp(newOtp)
        if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
        const newCompleteOtp=newOtp.join('')
        if(newCompleteOtp.length===length){
            setOtp&&setOtp(newCompleteOtp)
        }
    }
    }

    const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !localOtp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').substring(0, length);

    if (/^\d*$/.test(pastedData) && pastedData.length === length) {
      const newOtp = pastedData.split('');
      setLocalOtp(newOtp);

      inputRefs.current[length - 1].focus();

      setOtp && setOtp(pastedData);
    }
  };
    return (  
        <> 
        <h1>OTP Input Component</h1>
        <div className='otp-input-container'>
            {
                localOtp?.map((otp,idx)=>{
                    return <input 
                    ref={(el) => (inputRefs.current[idx] = el)} 
                    key={idx} maxLength={1} 
                    type="text"
                    onChange={(e)=>handleChange(e,idx)} 
                    value={otp} 
                    className='otp-input-box'
                    inputMode="numeric"
                    autoFocus={idx === 0}
                    onKeyDown={(e)=>handleKeyDown(e,idx)}
                    onPaste={handlePaste}
                    />
                })
            }
        </div>
        </>
    )
}

export default OtpInput