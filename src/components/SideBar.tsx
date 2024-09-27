import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSideBarContext } from "../contexts/SideBarContext";
import { PageHeaderLogo } from "../layouts/PageHeader";

export function SideBar() {
  const { isSmallOpen, isLargeOpen, close } = useSideBarContext();
  return (
    <>
      {/* sidebar for smaller screens and collapsed big screen */}
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>

      {/* sidebar for larger screens */}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-40 bg-white max-h-screen" : "hidden"}`}
      >
        {/* Logo in Sidebar */}
        <div
          className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white"
          onClick={isSmallOpen ? close : undefined}
        >
          <PageHeaderLogo />
        </div>

        <LargeSideBarSection>
          <LargeSideBarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSideBarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSideBarSection>
        <hr />

        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem IconOrImgUrl={Library} title="Library" url="/library" />
          <LargeSideBarItem IconOrImgUrl={History} title="History" url="/history" />
          <LargeSideBarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="/your-videos" />
          <LargeSideBarItem IconOrImgUrl={Clock} title="Watch Later" url="/playlist?list=WL" />

          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />

        <LargeSideBarSection title="Subscriptions" visibleItemCount={5}>
          {subscriptions.map((subscription) => (
            <LargeSideBarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />

        <LargeSideBarSection title="Explore" visibleItemCount={5}>
          <LargeSideBarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
          <LargeSideBarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/shopping" />
          <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItem IconOrImgUrl={Film} title="Movies & TV" url="/movies-tv" />
          <LargeSideBarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSideBarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/gaming" />
          <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItem IconOrImgUrl={Trophy} title="Sports" url="/sports" />
          <LargeSideBarItem IconOrImgUrl={Lightbulb} title="Learning" url="/learning" />
          <LargeSideBarItem IconOrImgUrl={Shirt} title="Beauty" url="/beauty" />
          <LargeSideBarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-3 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <p className="text-sm">{title}</p>
    </a>
  );
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandedBtn = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
  const BtnIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <p className="ml-4 mt-2 text-lg mb-1">{title}</p>}
      {visibleChildren}
      {showExpandedBtn && (
        <Button
          variant={"ghost"}
          className="w-full flex items-center rounded-lg gap-4 p-3"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <BtnIcon />
          <p>{isExpanded ? "Show less" : "Show more"}</p>
        </Button>
      )}
    </div>
  );
}

type LargeSideBarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSideBarItem({ IconOrImgUrl, title, url, isActive }: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" alt="" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <p className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</p>
    </a>
  );
}
