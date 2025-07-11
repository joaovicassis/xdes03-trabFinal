import Image from "next/image";
import Link from "next/link";
import ConexaoBD from "../lib/ConexaoBD";
import { redirect } from "next/navigation";
import path from "path";

export interface LeagueProps {
    id: number,
    nome: string,
    pais: string,
    img: string,
}

const arquivo = path.join(process.cwd(), 'src', 'db', 'league-db.json');

export default function LeagueCard(props: LeagueProps) {

    const deleteLeague = async (formData: FormData) => {
        'use server';

        const id = Number(formData.get('league-id'));
        const listaLigas = await ConexaoBD.retornaBD(arquivo);
        const ligaIdx = listaLigas.findIndex((d) => d.id === id);

        listaLigas.splice(ligaIdx,1);
        await ConexaoBD.armazenaBD(arquivo, listaLigas);

        redirect('/main/list');
    }

    return(
        <div className="league-container-card">
            <h1>{props.nome}</h1>
            <Image src={props.img}
                   alt="Imagem do emblema da liga"
                   width={200}
                   height={200}
            />
            <p>{props.pais}</p>
            <section className="league-edit-buttons-container">
                <Link href={`/main/edit/${props.id}`} className="link-edit-league">Editar</Link>
                <form action={deleteLeague}>
                    <button>Remover</button>
                    <input defaultValue={props.id} name="league-id" hidden/>
                </form>
            </section>
        </div>
    );
}