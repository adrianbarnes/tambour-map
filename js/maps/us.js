function _x(location, x) {
    switch (location) {
        case 'VT':
        case 'NH':
        case 'ME':
            x -= 50;
            break;
        case 'MT':
        case 'TX':
            x += 50;
            break;
        case 'AK':
            x += 140;
            break;
    }
    return x;
}

function _y(location, y) {
    switch (location) {
        case 'FL':
            y -= 70;
            break;
        case 'AK':
            y -= 20;
            break;
        default:
            y -= 30;
            break;

    }
    return y;
}


function _labelPos(path, d) {

    var r = path.centroid(d);
 
    var maplocation = $('maplocation').get('value');

    switch (d.properties.abbr) {
        case "PA":
            r[0] += 5;
            r[1] += 0;
            break;
        case "VA":
            r[0] += 5;
            r[1] += 5;
            break;
        case "LA":
            r[0] += 2;
            r[1] += 15;
            break;
        case "FL":
            r[0] += 10;
            r[1] += 0;
            break;
        case "MI":
            r[0] += 8;
            r[1] += 8;
            break;
        case "KY":
            r[0] += 4;
            r[1] += 5;
            break;
        case "TN":
            r[1] += 4;
            break;
        case "CA":
            r[0] -=5;
            break;
        case "VT":
            r[0] -= 6;
            r[1] -= 24;
            break;
        case "NY":
            r[0] += 6;
            break;
        case "SC":
        case "OH":
            r[1] += 3;
            break;
        case "IN":
            r[0] += 2;
            break;
        case "IL":
            r[0] += 2;
            r[1] += 10;
            break;
            
            
        case "NH":
            r[0] += 40;
            r[1] += 12;
            break;

        case "MA":
            r[0] += 38;
            r[1] += 1;
            break;
        case "RI":
            r[0] += 30;
            r[1] += 18;
            break;
        case "CT":
            r[0] += 40;
            r[1] += 30;
            break;
        case "NJ":
            r[0] += 32;
            r[1] += 12;
            break;
        case "DE":
            r[0] += 40;
            r[1] += 20;
            break;
        case "MD":
            r[0] += 55;
            r[1] += 45;
            break;
        case "HI":
            r[0] -= 20;
            r[1] += 20;
            break;
        case "DC":
            r[0] += 50;
            r[1] += 65;
            break;
        case "BC":
            r[0] += 1;
            r[1] += 20;
            break;

        case "AS":
        case "GU":
        case "VI":
            r[0] += 20;
            r[1] += 0;
        case "PR":
            r[0] += 1;
            r[1] += 4;
            break;
        case "MP":
            r[0] += 22;
            r[1] += 28;
            break;
        case "ID":
            r[0] += 0;
            r[1] += 15;
            break;


    }


    return r;
}

function _labelIsExt(path, d) {

    var r = _labelPos(path, d);

    switch (d.properties.abbr) {
    
        case "RI":
            r[0] -= 5;
            r[1] -= 5;
            break;
        case "CT": 
            r[0] -= 0;
            r[1] -= 8;
            break;
        case "NJ":
            r[0] -= 32;
            r[1] -= 12;
            break;
        case "DE":
            r[0] -= 8;
            r[1] -= 5;
            break;
        case "MD":
            r[0] -= 8;
            r[1] -= 10;
            break;
        case "DC":
            r[0] -= 6;
            r[1] -= 10;
            break;


                

        case "HI":
            r[0] += 12;
            r[1] -= 12;
            break;

        case "MP":
            r[0] -= 22;
            r[1] -= 28;
            break;
            
        case "AS":
        case "GU":
        case "VI":
            r[0] -= 21;
            r[1] -= 4;
            break;

        case "VT":
            r[0] += 6;
            r[1] += 24;
            break;   
                
        case "NH":
            r[0] -= 40;
            r[1] -= 12;
            break;

        case "MA":
            r[0] -= 38;
            r[1] -= 1;
            break;

        default:
            return;
    }

    return r;
}