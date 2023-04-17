// TODO: remove this file once we have a better way to import MFEs without working around the qwik optimizer
declare var importMfe = (url: string) => Promise<any>;
declare global {
  var importMfe = (url: string) => Promise<any>;
}

declare var isLocal = boolean;
declare global {
  var isLocal = boolean;
}

declare var Cmps = Array<any>
declare global {
  var Cmps = Array<any>
}
