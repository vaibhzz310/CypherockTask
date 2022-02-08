//Implementation of Shamir Secret Sharing Algorithm using Galois field(256) as finite field.
//Takes a byte array and reconstructs it.
//Can be easily extended to accept multiple byte arrays as user input.

//function to return random integer between 1 to max
//because coeffcient should be a random positive integer
function getRandomInt(max) {
  return (Math.floor(Math.random() * max)) + 1;
}

(function main() {
    //Declaring byte array of size 32. Each element of it will act as secret.
    //Kept less elements for shorter code. For testing 32 elements can be kept.
    var secret = new Uint8Array([256,42,56,110,200,54,7,9,100,56,255]);
    
    //shares variable to store the 4 shares after encoding
    var shares=new Array(4);
    for(let i=0;i<4;i++){
        shares[i]=new Array(secret.length);
    }
    
    //Encoding the secret to form 4 shares
    for(let i=0;i<secret.length;i++)
    {
        let a=getRandomInt(256);
        let data=secret[i];
        for(let j=0;j<4;j++)
        {
            let x=j+1;
            //Modulo 256 is used to increase the security of this algorithm.
            //Using finite field of order 256 makes the pool off possible values infinite.
            let y=(a*x + data)%256;
            shares[j][i]=new Array(x,y);
        }
    }
    //shares[0] can be given to first person, shares[1] to second person and so on
    
    //Regenrating the secret from any 2 shares.
    //Input the share number to be used in variables share1 and share2
    let share1=2;
    let share2=3;
    const decodedSecret = new Uint8Array(secret.length);
    for(let i=0;i<secret.length;i++)
    {
        let xi0=shares[share1][i][0];
        let yi0=shares[share1][i][1];
        let xi1=shares[share2][i][0];
        let yi1=shares[share2][i][1];
        decodedSecret[i]=((yi1*xi0)-(yi0*xi1))/(xi0-xi1);
    }
    
    //Print the decoded Secret.
    //You can see that decoded secret is exactly same as the original secret.
    //We were able to decode it with the help of only two shares.
    for(let i=0;i<decodedSecret.length;i++){
        console.log(decodedSecret[i])
    }
    
}());
