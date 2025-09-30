
const wrapper=document.querySelector(".wrapper");
qrInput=wrapper.querySelector(".wrapper input");
const generateBtn=document.querySelector(".generate-btn");
const downloadBtn=document.querySelector(".download-btn");
qrImg=wrapper.querySelector(".qr-code img");

downloadBtn.disabled = true;


generateBtn.addEventListener("click",()=>{
    let qrValue=qrInput.value;
     if (!qrValue) {
        alert("Please enter text or a URL!");
        return;
    }
    generateBtn.innerText="Generating ...";
    qrImg.src=` https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.addEventListener("load",()=>{
        wrapper.classList.add("active");
        generateBtn.innerText="Generate";
        downloadBtn.disabled = false; 
    });
});

qrInput.addEventListener("keyup",()=>{
    if (!qrInput.value){
        wrapper.classList.remove("active");
    }
});


downloadBtn.addEventListener("click", () => {
   const qrUrl = qrImg.getAttribute("src");
   if (!qrUrl) {
    alert("Please generate a QR code first!");
    return;
    }else{
        downloadBtn.innerText="Downloading...";
        fetch(qrUrl)
        .then(res => res.blob())
        .then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qr-code.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            qrInput.value=""; 
            downloadBtn.innerText="Download";
        })
        .catch(() => alert("Failed to download QR Code"));
    }
});
