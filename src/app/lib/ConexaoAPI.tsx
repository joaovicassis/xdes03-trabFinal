import axios from "axios";
import { LeagueProps } from "../ui/league-card";
import path from "path";
import ConexaoBD from "./ConexaoBD";
import { redirect } from "next/navigation";

const url = 'https://api.football-data.org//v4/competitions/';
const arquivo = path.join(process.cwd(), 'src', 'db', 'league-db.json');

export default async function buscarAPI(nomeDaLigaProcurada: any) {
    const {data} = await axios.get(url);
    const listaLigasAPI = data['competitions'];

    const ligaProcuradaOBJ = listaLigasAPI.find((d: any) => d['name'] === nomeDaLigaProcurada);

    if(ligaProcuradaOBJ) {
        const newLiga: LeagueProps = {
            id: Number(ligaProcuradaOBJ['id']),
            nome: ligaProcuradaOBJ['name'],
            pais: ligaProcuradaOBJ['area']['name'],
            img: ligaProcuradaOBJ['emblem']
        }

        return newLiga;
    }
    else
        return false;
}