import ConexaoBD from "@/app/lib/ConexaoBD";
import Link from "next/link";
import path from "path";
import { notFound, redirect } from "next/navigation";
import { LeagueProps } from "@/app/ui/league-card";

const arquivo = path.join(process.cwd(), 'src', 'db', 'league-db.json');

interface EditLeagueProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditLeague({ params }: EditLeagueProps) {
    const { id } = await params;
    const leagueDB = await ConexaoBD.retornaBD(arquivo);
    const league = leagueDB.find((l: any) => String(l.id) === id);

    const updateLeague = async (formData: FormData) => {
        "use server";
        const updatedLeague: LeagueProps = {
            id: Number(id),
            nome: String(formData.get("nome")),
            pais: String(formData.get("pais")),
            img: String(formData.get("img"))
        };
        const index = leagueDB.findIndex((l: any) => String(l.id) === id);
        leagueDB.splice(index, 1, updatedLeague);
        await ConexaoBD.armazenaBD(arquivo, leagueDB);
        redirect('/main/list');
    };

    if (!league) return notFound();

    return (
        <div className="create-league-container">
            <h2>Editar Liga {league.nome}</h2>
            {league.img && (
                <img src={league.img} alt="Emblema da Liga" width={100} height={100} style={{margin: "0 auto"}} />
            )}
            <form action={updateLeague} className="create-league-form">
                <section className="league-input">
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome da Liga"
                        defaultValue={league.nome}
                        required
                    />
                </section>
                <section className="league-input">
                    <input
                        type="text"
                        id="pais"
                        name="pais"
                        placeholder="País da Liga"
                        defaultValue={league.pais}
                        required
                    />
                </section>
                <section className="league-input">
                    <input
                        type="text"
                        id="img"
                        name="img"
                        placeholder="URL do Emblema"
                        defaultValue={league.img}
                    />
                </section>
                <button>Atualizar Liga</button>
            </form>
            <Link href={'/main/list'}>Voltar para lista</Link>
        </div>
    );
}
