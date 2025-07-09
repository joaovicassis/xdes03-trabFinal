import Image from "next/image";
import Link from "next/link";
import ConexaoBD from "../lib/ConexaoBD";
import path from "path";
import { redirect } from "next/navigation";

export interface LeagueProps {
    id: number,
    name: string,
    area: string,
    emblem: string,
}

const arquivo = 'league-db.json';

export default function LeagueCard(props: LeagueProps) {

    const deleteLeague = async (formData: FormData) => {
        'use server';

        const id = formData.get('league-id');
        const listaLigas = await ConexaoBD.retornaBD(arquivo);
        const liga = listaLigas.find((d) => d.id === id);

        listaLigas.splice(liga.id,1);
        await ConexaoBD.armazenaBD(arquivo, listaLigas);

        redirect('/main/list');
    }

    return(
        <div className="league-container-card">
            <h2>{props.name}</h2>
            <Image src={props.emblem}
                   alt="Imagem do emblema da liga"
                   width={200}
                   height={200}
            />
            <p>{props.area}</p>
            <section className="league-edit-buttons-container">
                <Link href={`/main/edit/${props.id}`} className="link-edit-league">Editar</Link>
                <form action={deleteLeague}>
                    <button>Remover</button>
                    <input value={props.id} name="league-id" hidden/>
                </form>
            </section>
        </div>
    );
}