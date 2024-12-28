/**
 * see https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
 */

import { runInterceptors } from './interceptor';

const NativeXMLHttpRequest = window.XMLHttpRequest;

interface XMLHttpRequestContext {
  xhr: CustomXMLHttpRequest;
  readonly requestURL: string | URL;
  readonly requestMethod: string;
}

export interface XMLHttpResponseContext {
  xhr: CustomXMLHttpRequest;
  readonly requestURL: string | URL;
  readonly requestMethod: string;
  responseType: XMLHttpRequestResponseType;
  responseText: string | null;
  status: number;
}

type RequestInterceptor = (
  ctx: XMLHttpRequestContext
) => Promise<XMLHttpRequestContext | false>;
type ResponseInterceptor = (
  ctx: XMLHttpResponseContext
) => Promise<XMLHttpResponseContext>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

/**
 * A custom XMLHttpRequest class that supports request and response interceptors.
 */
class CustomXMLHttpRequest extends NativeXMLHttpRequest {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private requestURL: string | URL = '';
  private requestMethod: string = '';
  private requestContext: XMLHttpRequestContext | null = null;
  private responseContext: XMLHttpResponseContext | null = null;

  constructor() {
    super();
    this.overrideOnreadystatechange();
  }

  /**
   * 重写 onreadystatechange 方法
   *
   * @description 重写 onreadystatechange 方法，以便在 XMLHttpRequest 对象完成响应时执行响应拦截器，
   * 然后调用原始的 onreadystatechange 方法。
   */
  private overrideOnreadystatechange() {
    const originalOnReadyStateChange = this.onreadystatechange;

    this.responseContext = this.createResponseContext();
    this.onreadystatechange = (ev) => {
      if (this.readyState === NativeXMLHttpRequest.DONE) {
        // 遍历执行响应拦截器
        runInterceptors<XMLHttpResponseContext>(
          responseInterceptors.concat(this.responseInterceptors),
          this.responseContext!
        );
      }

      // 调用原始的 onreadystatechange
      if (originalOnReadyStateChange) {
        originalOnReadyStateChange.call(this, ev);
      }
    };
  }

  private createRequestContext(): XMLHttpRequestContext {
    return {
      xhr: this,
      requestURL: this.requestURL,
      requestMethod: this.requestMethod
    };
  }

  private createResponseContext(): XMLHttpResponseContext {
    return {
      xhr: this,
      requestURL: this.requestURL,
      requestMethod: this.requestMethod,
      status: 200,
      responseType: super.responseType,
      responseText: super.responseText
    };
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // 指定响应中包含的数据类型
  get responseType() {
    return this.responseContext?.responseType || super.responseType;
  }

  get responseText() {
    return this.responseContext?.responseText || super.responseText;
  }

  // 返回的类型取决于请求的 responseType 属性
  get response() {
    return this.responseText;
  }

  get status() {
    return this.responseContext?.status || super.status;
  }

  getResponseHeader(header: string): string | null {
    return super.getResponseHeader(header);
  }

  getAllResponseHeaders(): string {
    return super.getAllResponseHeaders();
  }

  open(method: string, url: string | URL): void {
    this.requestURL = url;
    this.requestMethod = method;
    super.open(method, url);
  }

  /**
   * 封装 send 方法，以便在发送请求之前执行拦截器
   *
   * @param body 请求体
   * @returns 返回一个Promise，不解析任何值
   */
  async send(body?: Document | XMLHttpRequestBodyInit | null): Promise<void> {
    this.requestContext = this.createRequestContext();

    // 遍历执行请求拦截器
    const result = await runInterceptors<XMLHttpRequestContext>(
      requestInterceptors.concat(this.requestInterceptors),
      this.requestContext!
    );

    if (result !== false) {
      super.send(body);
    }
  }
}

export const addXHRequestInterceptor = (interceptor: RequestInterceptor) => {
  requestInterceptors.push(interceptor);
};

export const addXHResponseInterceptor = (interceptor: ResponseInterceptor) => {
  responseInterceptors.push(interceptor);
};

export default CustomXMLHttpRequest;
