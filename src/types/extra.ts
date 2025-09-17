import { Axios } from 'axios';
import * as API from 'config';

export type Extra = {
    api: typeof API,
    client: Axios,
}