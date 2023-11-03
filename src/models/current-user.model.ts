import { ICurrentUser } from '@interfaces'

import { SupportedRoles } from '@enums'

export class CurrentUser {
  private _email?: string
  private _roles?: string[]
  private _permissions: string[]
  private _azp: string
  private _iss: string
  private _gty?: string
  private _sub: string
  private _scope: string

  constructor(user: ICurrentUser) {
    //auth0 client id
    this._azp = user.azp

    //grant type
    this._gty = user.gty

    //issuer
    this._iss = user.iss

    //subject, auth0 user id otherwise client id for m2m
    this._sub = user.sub

    //scope
    this._scope = user.scope

    //auth0 permissions
    this._permissions = user.permissions

    //user email
    this._email = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/email']

    //user roles
    this._roles = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/roles']
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.roles?.includes(role))
  }

  isAdmin(): boolean {
    return this.hasAnyRole([SupportedRoles.ADMIN])
  }

  get userId(): null | string {
    return this._sub?.startsWith('auth0') ? this._sub.split('|')[1] : null
  }

  get clientId(): string {
    return this._azp
  }

  get scope(): string {
    return this._scope
  }

  get issuer(): string {
    return this._iss
  }

  get email(): string | undefined {
    return this._email
  }

  get roles(): string[] | undefined {
    return this._roles
  }

  get permissions(): string[] {
    return this._permissions
  }

  get isClientCredentials(): boolean {
    return this._gty && this._gty === 'client-credentials'
  }
}
