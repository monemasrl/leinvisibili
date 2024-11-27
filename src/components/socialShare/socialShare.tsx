"use client";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import style from "./socialShare.module.scss";
function SocialShare({ url, title }: { url: string; title: string }) {
  return (
    <div className={style.socialBar}>
      <EmailShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        subject={title}
        body="body"
        className={style.socialButton}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
      <FacebookShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        className={style.socialButton}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        title={title}
        className={style.socialButton}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <PinterestShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        media={process.env.NEXT_PUBLIC_BASE_URL + url}
        className={style.socialButton}
      >
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <RedditShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        title={title}
        className={style.socialButton}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <TelegramShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        title={title}
        className={style.socialButton}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        title={title}
        className={style.socialButton}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={process.env.NEXT_PUBLIC_BASE_URL + url}
        title={title}
        className={style.socialButton}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}

export default SocialShare;
