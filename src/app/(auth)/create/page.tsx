'use client'

import styles from '@/app/styles/login.module.css';
import Image from 'next/image';
import z from 'zod';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { createUser } from '@/app/lib/credentials';
import { LoginCredentials } from '../login/page';
import { useRouter } from 'next/navigation';

const CreateUserSchema = z.object({
    email: z.string().trim().email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'}).trim().min(4, {message: 'Senha precisa no mínimo 4 caracteres'}),
    confPassword: z.string({message: 'Insira uma confirmação de senha'}).trim().min(1, {message: 'Confirmar Senha não pode ser vazia'}),
}).refine((data) => data.password === data.confPassword, {
    message: "Senhas não conferem",
    path: ["confPassword"]
});

export default function CreatePage(){
    const router = useRouter();

    const createUserAction = async (formData: FormData) => {

        const createUserData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confPassword: formData.get('conf-password') as string
        }

        const result = CreateUserSchema.safeParse(createUserData);

        if(!result.success){

            let errorMsg = '';

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + '. ';
            });

            toast.error(errorMsg);

            return;
        }
        
        const retorno = await createUser(createUserData as LoginCredentials);

        if(retorno.error){
            toast.error(retorno.error);
            return;
        }else if(retorno.success){
            toast.success(retorno.success);
            router.push('/login');
        }
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['login-background']}>
                <Image 
                    src="/campo.avif"
                    alt="Campo de futebol"
                    fill
                    className={styles['background-image']}
                    priority
                />
                <div className={styles.overlay}></div>
            </div>
            
            <form className={styles['login-form']} action={createUserAction}>
                <div className={styles['logo-container']}>
                    <div className={styles['soccer-ball']}>
                        <div className={styles['ball-pattern']}></div>
                    </div>
                    <h1 className={styles['login-title']}>⚽ Futebol Manager</h1>
                    <p className={styles['login-subtitle']}>Crie sua conta para começar!</p>
                </div>
                
                <div className={styles['inputs-container']}>
                    <section className={styles['user-input']}>
                        <div className={styles['input-icon']}>
                            <span className={styles.icon}>👤</span>
                        </div>
                        <input type="email" name="email" id="email" placeholder="Email" className={styles['form-input']}/>
                    </section>
                    
                    <section className={styles['user-input']}>
                        <div className={styles['input-icon']}>
                            <span className={styles.icon}>🔒</span>
                        </div>
                        <input type="password" name="password" id="password" placeholder="Senha" className={styles['form-input']}/>
                    </section>

                    <section className={styles['user-input']}>
                        <div className={styles['input-icon']}>
                            <span className={styles.icon}>🔒</span>
                        </div>
                        <input type="password" name="conf-password" id="conf-password" placeholder="Confirmar Senha" className={styles['form-input']}/>
                    </section>
                </div>
                
                <button className={styles['login-button']} type="submit">
                    <span className={styles['button-text']}>Cadastrar</span>
                    <span className={styles['button-icon']}>⚽</span>
                </button>
                
                <div className={styles['link-cadastrar']}>
                    Já tem conta? Clique <Link className={styles['btn-criar-conta']} href="/login">aqui</Link>
                </div>
            </form>
        </div>
    )
}
