import ConexaoBD from "@/app/lib/ConexaoBD";
import Link from "next/link";
import path from "path";
import { redirect } from "next/navigation";

const arquivo = path.join(process.cwd(), 'src', 'db', 'league-db.json');

export default function CreateLeague() {
    const addLeague = async (formData: FormData) => {
        "use server";
        const code = formData.get("code");
        const res = await fetch(`https://api.football-data.org/v4/competitions/${code}`, {
            headers: {
                'X-Auth-Token': process.env.FOOTBALL_API_KEY || ''
            }
        });
        if (!res.ok) throw new Error('Erro ao buscar competição na API');
        const data = await res.json();

        const novaLiga = {
            id: data.id,
            nome: data.name,
            pais: data.area?.name || '',
            img: data.emblem || ''
        };

        const leagueDB = await ConexaoBD.retornaBD(arquivo);
        leagueDB.push(novaLiga);
        await ConexaoBD.armazenaBD(arquivo, leagueDB);
        redirect('/main/list');
    };

    return (
        <div className="create-league-container">
            <h2>Inserir Nova Liga</h2>
            <form action={addLeague} className="create-league-form">
                <section className="league-input">
                    <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Código da Liga (ex: PL, BL1)"
                        aria-label="Código da Liga"
                        required
                    />
                </section>
                <button>Adicionar Liga</button>
            </form>
            <Link href={'/main/list'}>Voltar para lista</Link>
        </div>
    );
}