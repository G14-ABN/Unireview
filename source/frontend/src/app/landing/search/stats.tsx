export {stats}
import { Review } from "@/app/areaPersonale/createReview/models/review";
import Statistic from "antd/es/statistic/Statistic";
import { Progress, Flex } from "antd";

function stats(reviews: Review[]){
    if (reviews==undefined){
        return <Statistic title="Nessuna recensione trovata"value={0}/>
    }
    const getPercent =(n:number)=>{
        return (n/reviews.length)*100
    }
    const stars = [0, 0, 0, 0, 0]
    const marks = [0, 0, 0, 0, 0, 0]
    const tentativo = [0, 0, 0, 0, 0, 0]
    let votomedio=0
    let revmedia=0
    let tentativomedio=0
    let voti=0
    reviews.forEach(e=>{
        stars[Math.floor(e.average())-1]++
        revmedia+=e.average()
        const voto = e.voto.valueOf()
        const tent = e.tentativo?.valueOf()
        if(voto<18){
            marks[0]++
        }else {
            votomedio+=voto
            voti++
        if(voto<21){
            marks[1]++
        } else if (voto<24){
            marks[2]++
        }else if (voto<27){
            marks[3]++
        }else if(voto<30){
            marks[4]++
        }else {
            marks[5]++
        }}
        if (tent==undefined){
            tentativo[0]++
        }else {
            tentativomedio+=tent
        if (tent>4){
            tentativo[5]++
        }else{
            tentativo[tent]++
        }}
    })
    return(
    <>
    <Statistic title="Recensioni trovate"value={reviews.length}/>
    <Flex vertical={false}>
    <Flex vertical gap="small" style={{ width: "33%" }}>
    <Statistic title="Voto recensione medio"value={reviews.length==0?"Non disponibile":(revmedia/reviews.length).toPrecision(2)}/>
    <Progress percent={getPercent(stars[0])} style={{ width: "50%" }} size="small" format={(e)=>"1 stella: "+stars[0]}/>
    <Progress percent={getPercent(stars[1])} style={{ width: "50%" }}size="small" format={(e)=>"2 stella: "+stars[1]}/>
    <Progress percent={getPercent(stars[2])} style={{ width: "50%" }}size="small" format={(e)=>"3 stella: "+stars[2]}/>
    <Progress percent={getPercent(stars[3])} style={{ width: "50%" }}size="small" format={(e)=>"4 stella: "+stars[3]}/>
    <Progress percent={getPercent(stars[4])} style={{ width: "50%" }}size="small" format={(e)=>"5 stella: "+stars[4]}/>
  </Flex>
  <Flex vertical gap="small" style={{ width: "33%" }}>
  <Statistic title="Voto medio"value={voti==0?"Non disponibile":(votomedio/voti).toPrecision(2)}/>
    <Progress percent={getPercent(marks[0])} style={{ width: "50%" }}size="small" format={(e)=>"Senza voto: "+marks[0]}/>
    <Progress percent={getPercent(marks[1])} style={{ width: "50%" }}size="small" format={(e)=>"18-20: "+marks[1]}/>
    <Progress percent={getPercent(marks[2])} style={{ width: "50%" }}size="small" format={(e)=>"21-23: "+marks[2]}/>
    <Progress percent={getPercent(marks[3])} style={{ width: "50%" }}size="small" format={(e)=>"24-26: "+marks[3]}/>
    <Progress percent={getPercent(marks[4])} style={{ width: "50%" }}size="small" format={(e)=>"27-29: "+marks[4]}/>
    <Progress percent={getPercent(marks[5])} style={{ width: "50%" }}size="small" format={(e)=>"30-30L: "+marks[5]}/>
  </Flex>
  <Flex vertical gap="small" style={{ width: "33%" }}>
  <Statistic title="Tentativo medio"value={voti==0?"Non disponibile":(tentativomedio/voti).toPrecision(2)}/>
    <Progress percent={getPercent(tentativo[0])} style={{ width: "50%" }}size="small" format={(e)=>"Senza voto: "+tentativo[0]}/>
    <Progress percent={getPercent(tentativo[1])} style={{ width: "50%" }}size="small" format={(e)=>"1: "+tentativo[1]}/>
    <Progress percent={getPercent(tentativo[2])} style={{ width: "50%" }}size="small" format={(e)=>"2: "+tentativo[2]}/>
    <Progress percent={getPercent(tentativo[3])} style={{ width: "50%" }}size="small" format={(e)=>"3: "+tentativo[3]}/>
    <Progress percent={getPercent(tentativo[4])} style={{ width: "50%" }}size="small" format={(e)=>"4: "+tentativo[4]}/>
    <Progress percent={getPercent(tentativo[5])} style={{ width: "50%" }}size="small" format={(e)=>"5+: "+tentativo[5]}/>
  </Flex>
  </Flex>
    </>)
}