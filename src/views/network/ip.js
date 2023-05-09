var ipCidr = require("ip-cidr");
const address = "10.10.195.45/24";

const isCidr = (address) => {
    var cidr = null; 

    try {
        cidr = new ipCidr(address);  

        if(cidr != null) {
    
            const start = cidr.start()
            //const isValid = ipCidr.isValidCIDR(address)
    
            //const ip = cidr.address.addressMinusSuffix;
            //const mask = cidr.address.subnetMask;
        
            //const ipStart = cidr.addressStart.addressMinusSuffix;
            //const maskStart = cidr.addressStart.subnetMask;
                        
            console.log(ip, mask, ipStart, maskStart)    
            console.log(ip == ipStart)
            console.log(mask == maskStart)
            console.log(isValid)
            const isHost = ip == ipStart ? false : true
            //return !isHost;
            return cidr.address.addressMinusSuffix == start
        }

    } catch (error) {
        console.log("no es valido")
        return false;
    }
}

const subnet = isCidr(address)
console.log("subnet:" + subnet)

//https://jodies.de/ipcalc?host=10.0.0.0&mask1=30&mask2=