import ConexaoBD from "@/app/lib/ConexaoBD";
import Link from "next/link";
import path from "path";
import { redirect } from "next/navigation";
import styles from "../../page.module.css";
import buscarAPI from "@/app/lib/ConexaoAPI";

const arquivo = path.join(process.cwd(), 'src', 'db', 'league-db.json');

export default function CreateLeague() {
    const getAPI = async (formData: FormData) => {
        "use server";

        const nome = formData.get("nome");
        const novaLiga = await buscarAPI(nome);

        if(!novaLiga) {
            return;
        }

        const leagueDB = await ConexaoBD.retornaBD(arquivo);
        leagueDB.push(novaLiga);
        await ConexaoBD.armazenaBD(arquivo, leagueDB);
        redirect('/main/list');
    };

    return (
        <div className="create-league-container">
            <h1>Inserir Nova Liga</h1>
            <form action={getAPI} className="create-league-form">
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
                <button>Adicionar Liga</button>
            </form>
            <Link href={'/main/list'}>Voltar para lista</Link>
        </div>
    );
}