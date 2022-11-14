export function addPlus(value){
    if (parseInt(value, 10)>0){
      return "+ "+value
    }
    return value
  }

export function addPercent(value){
    return " "+value+" % "
  }
  
export function getMonth(number){
    let months = ["None", "jan.", "fev.", "mars", "avr.", "mai", 'juin', "juil.", "août", "sept.", "oct.", "nov.", "dec."]
    return months[number]
}
    

export async function getResults() {
    const response = await fetch("https://damsopronos.alwaysdata.net/conseilResults");
    const data = await response.json();
    data.forEach((prono)=>{
    let pronoDate = new Date(prono.date);
    let stake = 100
    let plus1Date = pronoDate.setDate(pronoDate.getDate() +1)
    prono.date = new Date(plus1Date);
    prono.date = prono.date.toISOString().substr(0, 10)
    let newDate = prono.date.substring(8,10)
    let month = parseInt(prono.date.substring(5, 7), 10)
    prono.date = newDate
    prono.month = getMonth(month)
    prono.ODD_HOME = prono.ODD_HOME.toFixed(5).substring(0, 4)
    prono.OD_DRAW_OR_AWAY = prono.OD_DRAW_OR_AWAY.toFixed(5).substring(0, 4)
    if (prono.conseil==1){// prono classique, vainqueur ou exté ou nul
        if (prono.prono === prono.resultat){
            if (prono.prono == -1){
            prono.resultat = Math.round(stake*(prono.OD_DRAW_OR_AWAY-1)*100)/100
            }
            else{
            prono.resultat = Math.round(stake*(prono.ODD_HOME-1)*100)/100
            }
            prono.status = "success";
        }
        else{
            prono.resultat = -1*stake
            prono.status = "error"
        }
        if (prono.prono == -1 & prono.conseil == 1){
            prono.prono = "X2"
            prono.pronoTexte = prono.AwayTeam + " ou nul"
            prono.cote = prono.OD_DRAW_OR_AWAY
        }
        else{
            prono.prono = "1"
            prono.pronoTexte = prono.HomeTeam + " vainqueur"
            prono.cote = prono.ODD_HOME
        }
    }
    else if (prono.conseil==2){
        prono.pronoTexte = prono.AwayTeam + " ne perd pas ou perd d'1 but"
        prono.OD_AH2 = prono.OD_AH2.toFixed(5).substring(0, 4)
        prono.cote = prono.OD_AH2// to be defined.
        prono.OD_DRAW_OR_AWAY = prono.cote //temporary to put it under
        prono.status=prono.gain>0?"success":"error"
    }
    else if (prono.conseil==3){
        prono.pronoTexte = prono.HomeTeam + " ou nul";
        prono.OD_AH2 = prono.OD_AH2.toFixed(5).substring(0, 4)
        prono.cote = prono.OD_AH2;
        prono.status=prono.gain>0?"success":"error"
        prono.ODD_HOME=prono.OD_AH2;
    }
    else if (prono.conseil==4){
        prono.pronoTexte = prono.HomeTeam + " DNB";
        prono.OD_AH2 = prono.OD_AH2.toFixed(5).substring(0, 4)
        prono.cote = prono.OD_AH2;
        prono.status=prono.gain>0?"success":"error"
        prono.ODD_HOME=prono.OD_AH2;
    }
    
    })
    return data
}
  

export async function getGames(setGames) {
const response = await fetch("https://damsopronos.alwaysdata.net/apiAll");
const conseils = await response.json();
conseils.forEach((prono)=>{
    let pronoDate = new Date(prono.date);
    let plus1Date = pronoDate.setDate(pronoDate.getDate() +1)
    prono.date = new Date(plus1Date);
    prono.date = prono.date.toISOString().substr(0, 10)
    let newDate = prono.date.substring(8,10)
    let month = parseInt(prono.date.substring(5, 7), 10)
    prono.date = newDate
    prono.month = getMonth(month)
    prono.ODD_HOME = prono.ODD_HOME.toFixed(5).substring(0, 4)
    prono.OD_DRAW_OR_AWAY = prono.OD_DRAW_OR_AWAY.toFixed(5).substring(0, 4)
    if (prono.conseil==1 | prono.conseil==null){//cas classique, n'est pass un conseil 2
        if (prono.prono == -1){
        prono.prono = "X2"
        prono.pronoTexte = prono.AwayTeam + " ou nul"
        prono.cote = prono.OD_DRAW_OR_AWAY
        }
        else{
        prono.prono = "1"
        prono.pronoTexte = prono.HomeTeam + " vainqueur"
        prono.cote = prono.ODD_HOME
        }
        if (prono.confidence>65){
        prono.status="success"
        }
        else{
        prono.status="warning"
        }
    }
    else if (prono.conseil==2){
        prono.pronoTexte = prono.AwayTeam + " ne perd pas ou perd d'1 but"
        prono.OD_AH2 = prono.OD_AH2.toFixed(5).substring(0, 4)
        prono.cote = prono.OD_AH2// to be defined.
        prono.OD_DRAW_OR_AWAY = prono.cote //temporary to put it under
        prono.confidence = prono.confidence+10 //boost
        if (prono.confidence>65){
            prono.status="success"
            }
        else{
            prono.status="warning"
        }
    }
    else if (prono.conseil==3){
        prono.pronoTexte = prono.HomeTeam + " ou nul"
        prono.OD_AH2 = prono.OD_AH2.toFixed(5).substring(0, 4)
        prono.cote = prono.OD_AH2// to be defined.
        prono.ODD_HOME = prono.cote //temporary to put it under
        prono.confidence = prono.confidence+10 //boost
        if (prono.confidence>65){
            prono.status="success"
            }
        else{
            prono.status="warning"
        }
    }
    else if (prono.conseil==4){
        prono.pronoTexte = prono.HomeTeam + " DNB"
        prono.OD_AH2 = prono.OD_AH2.toFixed(5).substring(0, 4)
        prono.cote = prono.OD_AH2// to be defined.
        prono.ODD_HOME = prono.cote //temporary to put it under
        prono.confidence = prono.confidence+10 //boost
        if (prono.confidence>65){
            prono.status="success"
            }
        else{
            prono.status="warning"
        }
    }
})
conseils.sort((a, b)=> {
    if (a.month>b.month){
        return -1
    }
    else if (a.month==b.month){
        if (a.date<b.date){
            return -1
        }
        else if (a.date==b.date){
            if (a.confidence>b.confidence){
                return -1
            }
            else{
                return 1
            }
        }
        else{
            return 1
        }
    }
    else{
        return 1;
    }
})
setGames(conseils)
}

export async function getGameData(gameId, setGameData){
    const response = await fetch("https://damsopronos.alwaysdata.net/apiGame/"+gameId);
    const gameData = await response.json();
    setGameData(gameData[0]);
}
  
export async function getStats(setStats) {
const response = await fetch("https://damsopronos.alwaysdata.net/conseilStats");
const stats = await response.json();
const results = await getResults();
setStats({results: results, 
            benefice: stats[0].benefice, 
            nbparis: stats[0].nbparis, 
            nbwon: stats[0].nbWon,
            reussiteTexte: stats[0].nbWon.toString()+"/"+stats[0].nbparis.toString(), 
            reussitePourcentage: (Math.round(100*100*stats[0].nbWon/stats[0].nbparis)/100).toString()+"%",
            reussite: stats[0].nbWon.toString()+"/"+stats[0].nbparis.toString()})
}