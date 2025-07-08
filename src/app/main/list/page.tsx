import ConexaoBD from "@/app/lib/ConexaoBD";
import LeagueCard, { LeagueProps } from "@/app/ui/league-card";
import Link from "next/link";
import path from "path";

const arquivo = 'league-db.json';

export default async function list() {
    const listaLigas = await ConexaoBD.retornaBD(arquivo);

    const ligasMap = listaLigas.map((liga: LeagueProps) => {
        return <LeagueCard key={liga.id} {...liga}/>
    });

    return(
        <div className="list-container">
            <Link href={'/main/create'} className="link-add-league">Adicionar</Link>
            <div className="list-pokemon-container">
                {ligasMap}
            </div>
        </div>
    );
}