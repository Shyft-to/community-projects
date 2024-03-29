"use client";

import { SVGProps } from "react";
import IconButton from "../ui/icon-button";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="container flex flex-col gap-4 mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="flex flex-col gap-6 md:col-span-3 lg:md:col-span-4">
            <a href="/">
              <Image alt="logo" height={32} width={139} src="shyft_logo.svg" />
            </a>
            <p className="text-xs">
              Get in touch with our discord community and keep up with the
              latest feature releases.
              <br /> Get help from our developers who are always here to help
              you take off.
            </p>
            <div className="flex gap-4">
              <IconButton
                className="shrink-0"
                as="a"
                label="Github"
                target="_blank"
                href="https://github.com/Shyft-to"
              >
                <GithubIcon />
              </IconButton>
              <IconButton
                className="shrink-0"
                as="a"
                target="_blank"
                label="Twitter"
                href="https://twitter.com/shyft_to"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                className="shrink-0"
                as="a"
                target="_blank"
                label="Linkedin"
                href="https://www.linkedin.com/company/shyft-to/"
              >
                <LinkedinIcon />
              </IconButton>
              <IconButton
                className="shrink-0"
                as="a"
                target="_blank"
                label="Dicord"
                href="https://discord.gg/8JyZCjRPmr"
              >
                <DiscordIcon className="w-8 h-8" />
              </IconButton>
              <IconButton
                className="shrink-0"
                as="a"
                target="_blank"
                label="Telegram"
                href="https://t.me/shyft_to"
              >
                <TelegramIcon className="w-8 h-8" />
              </IconButton>
              <IconButton
                className="shrink-0"
                as="a"
                target="_blank"
                label="Medium"
                href="https://medium.com/shyft-to"
              >
                <MediumIcon className="w-8 h-8" />
              </IconButton>
              <IconButton
                className="shrink-0"
                as="a"
                target="_blank"
                label="Medium"
                href="https://www.youtube.com/@Shyft-to"
              >
                <YoutubeIcon className="w-8 h-8" />
              </IconButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Products</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <a
                  href="https://docs.shyft.to/solana-indexers/instant-graphql-apis"
                  target="_blank"
                  className="hover:text-brand"
                >
                  GraphQL APIs
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://docs.shyft.to/start-hacking/nft"
                  target="_blank"
                  className="hover:text-brand"
                >
                  NFT APIs
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://docs.shyft.to/start-hacking/nft-marketplace"
                  target="_blank"
                  className="hover:text-brand"
                >
                  Marketplace APIs
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://docs.shyft.to/start-hacking/fungible-tokens"
                  target="_blank"
                  className="hover:text-brand"
                >
                  Token APIs
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://docs.shyft.to/start-hacking/wallet"
                  target="_blank"
                  className="hover:text-brand"
                >
                  Wallet APIs
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">For Developers</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <a
                  href="https://docs.shyft.to/"
                  className="hover:text-brand"
                  target="_blank"
                >
                  Documentation
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://discord.gg/8JyZCjRPmr"
                  target="_blank"
                  className="hover:text-brand"
                >
                  Join Discord
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://medium.com/shyft-to"
                  target="_blank"
                  className="hover:text-brand"
                >
                  Blogs
                </a>
              </li>
              <li className="text-sm">
                <a
                  href="https://twitter.com/shyft_to"
                  target="_blank"
                  className="hover:text-brand"
                >
                  Announcements
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <a
            className="text-sm hover:text-brand"
            href="mailto:genesis@shyft.to"
          >
            Contact: genesis@shyft.to
          </a>
          <div className="flex gap-1">
            <a
              className="text-sm hover:text-brand"
              href="https://shyft.to/terms"
              target="_blank"
            >
              Terms &amp; Conditions
            </a>{" "}
            |
            <a
              className="text-sm hover:text-brand"
              href="https://shyft.to/privacy-policy"
              target="_blank"
            >
              {" "}
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const DiscordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <title>{"discord_fill"}</title>
    <g
      id="\u9875\u9762-1"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="Logo" transform="translate(-480.000000, -144.000000)">
        <g id="discord_fill" transform="translate(480.000000, 144.000000)">
          <path
            d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
            id="MingCute"
            fillRule="nonzero"
          />
          <path
            d="M15.0031,4 C15.74742,4 16.532444,4.2597504 17.2533144,4.5466496 L17.7803,4.76328 L17.7803,4.76328 C19.0402,5.29134 19.7484,6.39876 20.2975,7.61613 C21.1882,9.59078 21.8067,12.2238 22.0209,14.2256 C22.1227,15.1766 22.1483,16.1321 21.9647,16.7747 C21.76838,17.46166 21.0975,17.947788 20.4466008,18.3303128 L20.1251058,18.5133917 L20.1251058,18.5133917 L19.7907,18.6986 C19.61865,18.794725 19.442175,18.8900812 19.2660703,18.9830547 L18.7436625,19.2532125 L18.7436625,19.2532125 L18.0271553,19.610458 L18.0271553,19.610458 L17.4503,19.8944 L17.4503,19.8944 C16.9564,20.1414 16.3557,19.9412 16.1087,19.4472 C15.8617,18.9532 16.0619,18.3526 16.5559,18.1056 L17.3469,17.7158 L17.3469,17.7158 L16.7663,17.1071 C15.3765,17.6777 13.7389,18 12.0001,18 C10.2612,18 8.6236,17.6777 7.23378,17.1071 L6.65415,17.7148 L7.44727,18.1056 L7.44727,18.1056 C7.94124,18.3526 8.14147,18.9532 7.89448,19.4472 C7.64749,19.9412 7.04682,20.1414 6.55284,19.8944 L6.00922,19.6247 C5.60650667,19.4255667 5.20386444,19.2265222 4.80574963,19.0185 L3.87804989,18.5133917 L3.87804989,18.5133917 L3.55657432,18.3303128 C2.9057004,17.947788 2.234774,17.46166 2.03851,16.7747 C1.85493,16.1321 1.88051,15.1766 1.98227,14.2256 C2.19645,12.2238 2.81496,9.59078 3.70567,7.61613 C4.25479,6.39877 4.96296,5.29134 6.22289,4.76328 C7.05903,4.41284 8.07171,4 9.00004,4 C9.60303,4 10.0767,4.55523 9.98927,5.14727 C10.6366,5.05075 11.3099,5 12.0001,5 C12.6914,5 13.3657,5.05091 14.014,5.14774 C13.9263,4.55557 14.4,4 15.0031,4 Z M8.75006,10.5 C7.78356,10.5 7.00006,11.2835 7.00006,12.25 C7.00006,13.2165 7.78356,14 8.75006,14 C9.71656,14 10.5001,13.2165 10.5001,12.25 C10.5001,11.2835 9.71656,10.5 8.75006,10.5 Z M15.2501,10.5 C14.2836,10.5 13.5001,11.2835 13.5001,12.25 C13.5001,13.2165 14.2836,14 15.2501,14 C16.2166,14 17.0001,13.2165 17.0001,12.25 C17.0001,11.2835 16.2166,10.5 15.2501,10.5 Z"
            id="\u5F62\u72B6"
            fill="currentColor"
          />
        </g>
      </g>
    </g>
  </svg>
);

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    //   width="800px"
    //   height="800px"
    viewBox="0 0 24 24"
    id="Layer_1"
    data-name="Layer 1"
    {...props}
  >
    <title>{"telegram"}</title>
    <path d="M22.26465,2.42773a2.04837,2.04837,0,0,0-2.07813-.32421L2.26562,9.33887a2.043,2.043,0,0,0,.1045,3.81836l3.625,1.26074,2.0205,6.68164A.998.998,0,0,0,8.134,21.352c.00775.012.01868.02093.02692.03259a.98844.98844,0,0,0,.21143.21576c.02307.01758.04516.03406.06982.04968a.98592.98592,0,0,0,.31073.13611l.01184.001.00671.00287a1.02183,1.02183,0,0,0,.20215.02051c.00653,0,.01233-.00312.0188-.00324a.99255.99255,0,0,0,.30109-.05231c.02258-.00769.04193-.02056.06384-.02984a.9931.9931,0,0,0,.20429-.11456,250.75993,250.75993,0,0,1,.15222-.12818L12.416,18.499l4.03027,3.12207a2.02322,2.02322,0,0,0,1.24121.42676A2.05413,2.05413,0,0,0,19.69531,20.415L22.958,4.39844A2.02966,2.02966,0,0,0,22.26465,2.42773ZM9.37012,14.73633a.99357.99357,0,0,0-.27246.50586l-.30951,1.504-.78406-2.59307,4.06525-2.11695ZM17.67188,20.04l-4.7627-3.68945a1.00134,1.00134,0,0,0-1.35352.11914l-.86541.9552.30584-1.48645,7.083-7.083a.99975.99975,0,0,0-1.16894-1.59375L6.74487,12.55432,3.02051,11.19141,20.999,3.999Z" />
  </svg>
);

const MediumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="-2 -4 24 24"
    preserveAspectRatio="xMinYMin"
    {...props}
  >
    <path d="M2.372 3.264a.784.784 0 0 0-.252-.658L.252.339V0H6.05l4.482 9.905L14.472 0H20v.339L18.403 1.88a.472.472 0 0 0-.177.452v11.334a.472.472 0 0 0 .177.452l1.56 1.542V16H12.12v-.339l1.615-1.58c.159-.16.159-.207.159-.451V4.468L9.402 15.962h-.606L3.566 4.468v7.704c-.043.324.064.65.29.884l2.101 2.568v.338H0v-.338l2.1-2.568a1.03 1.03 0 0 0 .272-.884V3.264z" />
  </svg>
);
