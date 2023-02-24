
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import StandardHead from '@/components/StandardHead'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <StandardHead />
      <div className={styles.background}>
        <div className={styles.middle_layer}>
          <div className={styles.dotted_top}>
            <Image src="/images/spotted-planet-top.png" width={73} height={132}/>
          </div>
          <div className={styles.blue_planet}>
            <Image src="/images/blue_planet.png" width={88} height={179}/>
          </div>
          <div className={styles.red_planet}>
            <Image src="/images/red-planet.png" width={199} height={230}/>
          </div>
          <div className={styles.dotted_bottom}>
            <Image src="/images/spotted-planet-bottom.png" width={144} height={134}/>

          </div>
          
          <div className={styles.top_layer}>
            <div className={styles.content_area}>
              <div className="container-xl">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className={styles.text_and_form}>
                        <h1 className={styles.main_heading}>
                          Explore Your Space In Shyft Metaverse
                        </h1>
                        <p className={styles.description_text}>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi harum fugiat accusamus. Accusantium, 
                          voluptatem eius esse doloremque incidunt itaque atque rerum, ut at illo, nisi facilis dignissimos quas fuga hic.
                        </p>
                        <div className={styles.form_container}>
                          <label>Enter Wallet Address</label>
                          <div className={styles.form_field_outer}>
                            <div className={styles.form_field_inner}>
                              <input type="text" />
                            </div>
                          </div>

                        </div>
                        <div className="pt-5 mt-1">
                          <button className={styles.btn_solid_grad}>Continue</button>
                        </div>
                    </div>
                    <div className={styles.rocket_container}>

                    </div>
                  </div>
                  <div className="col-12 col-lg-6"></div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  )
}
