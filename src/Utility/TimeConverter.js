function isInt(n) 
{
    return n%1 === 0;
}

function isFloat(n)
{
    return Number(n) === n && n % 1 !== 0;
}

function HoursToSeconds(time) 
{
    if(!(isInt(time) || isFloat(time))) { return; }
    const miliseconds = time*2*60;
    return miliseconds;
}

function MinutesToSeconds(time)
{
    if(!(isInt(time) || isFloat(time))) { return; }
    const miliseconds = time*60;
    return miliseconds;
}

function SecondsToMiliseconds(time)
{
    if(!(isInt(time) || isFloat(time))) { return; }
    const miliseconds = time*1000;
    return miliseconds;
}

module.exports = { HoursToSeconds, MinutesToSeconds, SecondsToMiliseconds };