import ConexaoBD from "@/app/lib/ConexaoBD";
import Link from "next/link";
import path from "path";
import { redirect } from "next/navigation";
import styles from "../../page.module.css";

const arquivo = path.join(process.cwd(), 'src', 'db', 'league-db.json');

export default function CreateLeague() {
    const addLeague = async (formData: FormData) => {
        "use server";
        const id = Number(formData.get("id"));
        const nome = formData.get("nome");
        const pais = formData.get("pais");
        const img = formData.get("img");

        const novaLiga = {
            id,
            nome,
            pais,
            img
        };

        const leagueDB = await ConexaoBD.retornaBD(arquivo);
        leagueDB.push(novaLiga);
        await ConexaoBD.armazenaBD(arquivo, leagueDB);
        redirect('/main/list');
    };

    return (
        <div className="create-league-container">
            <h1>Inserir Nova Liga</h1>
            <form action={addLeague} className="create-league-form">
                <section className="league-input">
                    <input
                        type="number"
                        id="id"
                        name="id"
                        placeholder="ID da Liga"
                        aria-label="ID da Liga"
                        required
                    />
                </section>
                <section className="league-input">
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome da Liga"
                        aria-label="Nome da Liga"
                        required
                    />
                </section>
                <section className="league-input">
                    <input
                        type="text"
                        id="pais"
                        name="pais"
                        placeholder="País"
                        aria-label="País"
                        required
                    />
                </section>
                <section className="league-input">
                    <input
                        type="text"
                        id="img"
                        name="img"
                        placeholder="URL do Emblema"
                        aria-label="URL do Emblema"
                        required
                    />
                </section>
                <button>Adicionar Liga</button>
            </form>
            <Link href={'/main/list'}>Voltar para lista</Link>
        </div>
    );
}