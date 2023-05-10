const isCidr = (address) => {
    var ipCidr = require("ip-cidr");
    var cidr = null; 

    try {
        cidr = new ipCidr(address);  
        if(cidr != null) {
            const start = cidr.start()
            return cidr.address.addressMinusSuffix == start
        }
    } catch (error) {
        return false;
    }
}

export {isCidr}
