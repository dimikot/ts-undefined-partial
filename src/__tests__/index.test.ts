import { PartialToUndefined, UndefinedToPartial } from "..";

test("PartialToUndefined", async (): Promise<"equal"> => {
  type Got = PartialToUndefined<{
    a?: number | undefined;
    b?: string;
    c: boolean;
    d: Array<{
      e?: string;
      f?: Date | undefined;
      g: {
        h?: undefined | (() => void);
        i?: number;
      };
      h: {
        i: () => void;
        j?: number;
      };
      k?: Date | Set<number> | Map<number, Set<number>>;
      l?: [string | undefined, number];
    }>;
  }>;

  type Exp = {
    a: number | undefined;
    b: string | undefined;
    c: boolean;
    d: Array<{
      e: string | undefined;
      f: Date | undefined;
      g: {
        h?: undefined | (() => void);
        i?: number;
      };
      h: {
        i: () => void;
        j?: number;
      };
      k: Date | Set<number> | Map<number, Set<number>> | undefined;
      l: [string | undefined, number] | undefined;
    }>;
  };

  if (Date.now()) {
    return "" as Exp extends Got ? "equal" : "no";
  }

  return "" as Got extends Exp ? "equal" : "no";
});

test("UndefinedToPartial", async (): Promise<"equal"> => {
  type Got = UndefinedToPartial<{
    a: number | undefined;
    b: string | undefined;
    c: boolean;
    d: Array<{
      e: string | undefined;
      f: Date | undefined;
      g: {
        h?: undefined | (() => void);
        i?: number;
      };
      h: {
        i: () => void;
        j?: number;
      };
      k: Date | Set<number> | Map<number, Set<number>> | undefined;
      l: [string | undefined, number] | undefined;
    }>;
  }>;

  type Exp = {
    a?: number | undefined;
    b?: string | undefined;
    c: boolean;
    d: Array<{
      e?: string | undefined;
      f?: Date | undefined;
      g: {
        h?: undefined | (() => void);
        i?: number | undefined;
      };
      h: {
        i: () => void;
        j?: number | undefined;
      };
      k?: Date | Set<number> | Map<number, Set<number>> | undefined;
      l?: [string | undefined, number] | undefined;
    }>;
  };

  if (Date.now()) {
    return "" as Exp extends Got ? "equal" : "no";
  }

  return "" as Got extends Exp ? "equal" : "no";
});
