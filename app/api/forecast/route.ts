import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest):Promise<NextResponse>{
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const city = searchParams.get('q')

    if(!city){
        console.log('error3')
        return NextResponse.json({
            message:'Missing city'
        },{
            status:400
        })
    }

    const apiKey = process.env.API_KEY || process.env.PUBLIC_API_KEY || ''

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    try {

         const res = await fetch(apiUrl,{
            headers:{
                type:'application/json'
            }
         })

         if(!res.ok){
            console.log('error2')
            return NextResponse.json({
                message:'Server Error'
            },{status:500})
         }

         const data : ForecastWeatherResponse = await res.json()

         if(!data){
            console.log('error4')
            return NextResponse.json({
                message:'Data Error'
            },)
         }

         console.log('error123',data)
         return NextResponse.json(data)
    } catch (error) {
        console.log('error',error)
        return NextResponse.json({message:'Internal Server Error'},{status:500})
    }
}