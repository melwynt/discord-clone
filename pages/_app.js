import Link from 'next/link';
import { useRouter } from 'next/router';
import { Discord } from '../components/icons';

import { data } from '../data';

import '../styles/globals.css';
import '../styles/styles.css';

function MyApp({ Component, pageProps }) {
  let router = useRouter();

  return (
    <>
      <div className="flex text-gray-100 h-screen">
        <div className="bg-gray-900 p-3 space-y-2 overflow-y-scroll no-scrollbar hidden md:block">
          <NavLink href="/">
            <Discord className="w-7 h-5" />
          </NavLink>

          <hr className="border-t-white/[.06] border-t-2 rounded mx-2" />

          {data.map((server) => (
            <NavLink
              key={server.id}
              active={+router.query.sid === +server.id}
              href={`/servers/${server.id}/channels/${server.categories[0].channels[0].id}`}
            >
              <img src={`/servers/${server.img}`} alt="" />
            </NavLink>
          ))}
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

const NavLink = ({ href, active, children }) => {
  let router = useRouter();
  active ||= router.asPath === href;

  // console.log(router);
  // console.log(href);
  return (
    <Link href={href}>
      <a className="relative block group">
        <div className="flex absolute -left-3 h-full items-center">
          <div
            className={`${
              active
                ? 'h-10'
                : 'h-5 scale-0 opacity-0 group-hover:opacity-100  group-hover:scale-100'
            } w-1  bg-white rounded-r transition-all duration-200  origin-left`}
          ></div>
        </div>

        <div className="group-active:translate-y-px">
          <div
            className={`${
              active
                ? 'rounded-2xl bg-brand text-white'
                : 'bg-gray-700 rounded-3xl first-line:text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white'
            } h-12 w-12  font-medium flex items-center justify-center transition-all duration-200 overflow-hidden`}
          >
            {children}
          </div>
        </div>
      </a>
    </Link>
  );
};
