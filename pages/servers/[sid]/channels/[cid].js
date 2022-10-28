import Link from 'next/link';
import { data } from '../../../../data';
import * as Icons from '../../../../components/icons';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Server() {
  let router = useRouter();
  let [closedCategories, setClosedCategories] = useState([]);

  let server = data.find((server) => +server.id === +router.query.sid);

  let channel = server.categories
    .map((c) => c.channels)
    .flat()
    .find((channel) => +channel.id === +router.query.cid);

  const toggleCategory = (categoryId) => {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((id) => id !== categoryId)
        : [...closedCategories, categoryId],
    );
  };

  return (
    <>
      <div className="hidden md:flex flex-col bg-gray-800 w-60">
        <button className="flex items-center h-12 px-4 font-semibold text-white shadow-sm font-title text-[15px] hover:bg-gray-550/[0.16] transition">
          <div className="relative w-4 h-4 mr-1">
            <Icons.Verified className="absolute w-4 h-4 text-gray-550" />
            <Icons.Check className="absolute w-4 h-4" />
          </div>
          Tailwind CSS
          <Icons.Chevron className="w-[18px] h-[18px] ml-auto opacity-80" />
        </button>

        <div className="text-gray-300 flex-1 overflow-y-scroll no-scrollbar font-medium pt-3 space-y-[21px]">
          {server.categories.map((category) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center px-1 text-xs uppercase font-title tracking-wide hover:text-gray-100 w-full"
                >
                  <Icons.Arrow
                    className={`${
                      closedCategories.includes(category.id) ? '-rotate-90' : ''
                    } w-3 h-3 mr-0.5 transition duration-200`}
                  />
                  {category.label}
                </button>
              )}
              <div className="space-y-0.5 mt-[5px]">
                {category.channels
                  .filter((channel) => {
                    let categoryIsOpen = !closedCategories.includes(
                      category.id,
                    );
                    // we always want to show when a category is unread or when a category is openned
                    return categoryIsOpen || channel.unread;
                    //
                  })
                  .map((channel) => (
                    <ChannelLink channel={channel} key={channel.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700 flex-1 flex flex-col flex-shrink min-w-0">
        <div className="flex items-center h-12 px-2 shadow-sm">
          <div className="flex items-center">
            <Icons.Hashtag className="w-6 h-6 mx-2 font-semibold text-gray-400" />
            <span className="mr-2 text-white font-title whitespace-nowrap">
              {channel.label}
            </span>
          </div>

          {channel.description && (
            <>
              <div className="hidden md:block w-px h-6 mx-2 bg-white/[.06]"></div>
              <div className="hidden md:block mx-2 text-sm font-medium text-gray-200 truncate">
                {channel.description}
              </div>
            </>
          )}

          {/* Mobile buttons */}
          <div className="flex items-center ml-auto md:hidden">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="w-6 h-6 mx-2" />
            </button>

            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="w-6 h-6 mx-2" />
            </button>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center ml-auto">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="w-6 h-6 mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Bell className="w-6 h-6 mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Pin className="w-6 h-6 mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="w-6 h-6 mx-2" />
            </button>
            <div className="mx-2 relative">
              <input
                type="text"
                className="px-1.5 bg-gray-900 border-none h-6 w-36 rounded text-sm font-medium placeholder-gray-400"
                placeholder="Search"
              />
              <div className="absolute right-0 inset-y-0 flex items-center">
                <Icons.Spyglass className="w-4 h-4 mr-1.5 text-gray-400" />
              </div>
            </div>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Inbox className="w-6 h-6 mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.QuestionCircle className="w-6 h-6 mx-2" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll no-scrollbar">
          {channel.messages.map((message, i) => (
            <div key={message.id}>
              {i === 0 || message.user !== channel.messages[i - 1].user ? (
                <MessageWithUser message={message} />
              ) : (
                <Message message={message} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const ChannelLink = ({ channel }) => {
  let Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  let router = useRouter();
  let server = data.find((server) => +server.id === +router.query.sid);

  let active = +channel.id === +router.query.cid;

  let state = active
    ? 'active'
    : channel.unread
    ? 'inactiveUnread'
    : 'inactiveRead';

  let classes = {
    active: 'text-white bg-gray-550/[0.32]',
    inactiveUnread:
      'text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]',
    inactiveRead:
      'text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100 active:bg-gray-550/[0.24]',
  };

  return (
    <Link href={`/servers/${server.id}/channels/${channel.id}`}>
      <a
        className={`${classes[state]} flex items-center px-2 mx-2 py-1 rounded group relative`}
      >
        {state === 'inactiveUnread' && (
          <div className="absolute w-1 h-2 bg-white left-0 -ml-2 rounded-r-full"></div>
        )}
        <Icon className="w-5 h-5 text-gray-400 mr-1.5" />
        {channel.label}
        <Icons.AddPerson className="w-4 h-4 text-gray-200 hover:text-gray-100 opacity-0 group-hover:opacity-100 ml-auto" />
      </a>
    </Link>
  );
};

const MessageWithUser = ({ message }) => {
  return (
    <div className="leading-[22px] mt-[17px] flex pl-4 pr-16 py-0.5 hover:bg-gray-950/[0.07]">
      <img
        className="w-10 h-10 mr-4 rounded-full mt-0.5"
        src={message.avatarUrl}
        alt=""
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-green-400">
            {message.user}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {message.date}
          </span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
};

const Message = ({ message }) => {
  return (
    <div className="px-4 py-0.5 hover:bg-gray-950/[0.07] leading-[22px]">
      <p className="text-gray-100 pl-14">{message.text}</p>
    </div>
  );
};
