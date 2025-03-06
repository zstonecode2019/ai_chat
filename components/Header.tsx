export default function Header({
  nickname,
}: Readonly<{
  nickname: string;
}>) {
  return (
    <div className="absolute left-0 right-0">
      <div className="draggable no-draggable-children sticky top-0 p-3 mb-1.5 flex items-center justify-between z-10 h-header-height font-semibold bg-token-main-surface-primary max-md:hidden">
        <div className="absolute start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2"></div>
        <div className="flex items-center gap-0 overflow-hidden">
          <button
            aria-label=""
            type="button"
            id="radix-:rcd:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            data-testid="model-switcher-dropdown-button"
            className="group flex cursor-pointer items-center gap-1 rounded-lg py-1.5 px-3 text-lg hover:bg-token-main-surface-secondary radix-state-open:bg-token-main-surface-secondary font-semibold text-token-text-secondary overflow-hidden whitespace-nowrap"
          >
            <div className="text-token-text-secondary">
              ChatGPT <span className="text-token-text-secondary"></span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon-md text-token-text-tertiary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2 pr-1 leading-[0]">
          <button
            aria-label="打开“个人资料”菜单"
            data-testid="profile-button"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-token-main-surface-secondary focus-visible:bg-token-main-surface-secondary focus-visible:outline-0"
            type="button"
            id="radix-:r9b:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <div className="relative">
              <div className="flex items-center justify-center overflow-hidden rounded-full">
                <div className="relative">
                  <div className="relative flex  items-center justify-center h-[70px] text-center">
                    {nickname}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
