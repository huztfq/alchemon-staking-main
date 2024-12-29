import { assert } from 'chai';
import {
  AccountStore,
  Runtime,
  getProgram
} from '@algo-builder/runtime';
import {
  TransactionType,
  AppCallsParam,
  UpdateAppParam,
  SignType
} from '@algo-builder/web/build/types';

describe('App Test', () => {
  let mainAccount: AccountStore;
  let runtime: Runtime;
  const approvalProgram = 'contract_approval.py';
  const clearProgram = 'contract_clear.py';
  let appId: number;

  beforeEach(() => {
    mainAccount = new AccountStore(1e6);
    runtime = new Runtime([mainAccount]);
    appId = runtime.deployApp(
      getProgram(approvalProgram),
      getProgram(clearProgram),
      {
        sender: mainAccount.account,
        localInts: 0,
        localBytes: 0,
        globalInts: 0,
        globalBytes: 0
      },
      {}
    ).appID;
  });

  it('should succeed on NoOp', () => {
    assert.exists(appId);
    const params: AppCallsParam = {
      type: TransactionType.CallApp,
      fromAccount: mainAccount.account,
      appID: appId,
      sign: SignType.SecretKey,
      payFlags: {}
    };
    runtime.executeTx(params);
  });

  it('should fail on DeleteApp', () => {
    const params: AppCallsParam = {
      type: TransactionType.DeleteApp,
      fromAccount: mainAccount.account,
      appID: appId,
      sign: SignType.SecretKey,
      payFlags: {}
    };
    assert.throw(() => {
      runtime.executeTx(params);
    });
  });

  it('should fail on UpdateApp', () => {
    const params: UpdateAppParam = {
      type: TransactionType.UpdateApp,
      fromAccount: mainAccount.account,
      appID: appId,
      sign: SignType.SecretKey,
      payFlags: {},
      newApprovalProgram: getProgram(approvalProgram),
      newClearProgram: getProgram(clearProgram)
    };
    assert.throw(() => {
      runtime.executeTx(params);
    });
  })
})