function gcd(a,b){
    while(b != 0){
        let temp = b
        b = a % b
        a = temp
    }
    return a 
}


function gcd2(a,b){
    return b === 0 ? a : gcd2(b ,b % a)    
}

console.log(gcd2(30,2))