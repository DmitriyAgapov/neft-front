import Link from "next/link";
import Image from "next/image";
import styles from "./Logo.module.css";

const Logo = ({img, inversed = false}:any) => {
    const {url, width, height} = !inversed ? img.logo : img.logo_inverse;
    return (
        <div className={styles.logo}>
            <Link href={"/"}>
                <Image src={`${url}`} width={width} height={height} alt={''}/>
            </Link>
        </div>
    )
}
export default Logo