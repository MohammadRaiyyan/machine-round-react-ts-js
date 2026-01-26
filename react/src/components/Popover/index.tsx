import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

type Position = "bottom" | "top";
interface PopoverProps {
  children: ReactNode;
  position?: Position;
}

interface IPopoverContext {
  isOpen: boolean;
  toggle: VoidFunction;
  buttonRef: RefObject<HTMLButtonElement | null>;
  position: Position;
}
const PopoverContext = createContext<IPopoverContext | undefined>(undefined);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover Elements must be used inside the Popover context");
  }
  return context;
}

function Popover(props: PopoverProps) {
  const { children, position = "bottom" } = props;
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    return { isOpen, buttonRef, toggle, position };
  }, [isOpen, buttonRef, toggle, position]);

  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
}
interface TriggerProps {
  children: ReactNode;
}
function Trigger(props: TriggerProps) {
  const { buttonRef, toggle } = usePopoverContext();
  return (
    <button onClick={toggle} ref={buttonRef}>
      {props.children}
    </button>
  );
}
interface ContentProps {
  children: ReactNode;
}
function Content(props: ContentProps) {
  const { buttonRef, isOpen, position } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (isOpen && contentRef.current && buttonRef.current) {
      const {
        top: triggerTop,
        left: triggerLeft,
        height: triggerHeight,
        width: triggerWidth,
      } = buttonRef.current?.getBoundingClientRect();
      contentRef.current.style.position = "absolute";
      if (position === "bottom") {
        contentRef.current.style.left = `${triggerLeft + triggerWidth / 2}px`;
        contentRef.current.style.top = `${triggerTop + triggerHeight + 10}px`;
      } else if (position === "top") {
        contentRef.current.style.left = `${triggerLeft}px`;
        contentRef.current.style.top = `${triggerTop - triggerHeight}px`;
      }
      //   Todo: Implement other positioning logic along with window collision
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div ref={contentRef}>{props.children}</div>,
    document.body,
  );
}
Popover.Trigger = Trigger;
Popover.Content = Content;
export default Popover;
