from pyteal import *

def approval_program():
    # Handle each possible OnCompletion type. We don't handle ClearState here.
    handle_noop = Seq([
        Return(Int(1))
    ])

    handle_optin = Seq([
        Return(Int(1))
    ])

    handle_closeout = Seq([
        Return(Int(1))
    ])

    handle_updateapp = Err()
    handle_deleteapp = Err()

    program = Cond(
        [Txn.on_completion() == OnComplete.NoOp, handle_noop],
        [Txn.on_completion() == OnComplete.OptIn, handle_optin],
        [Txn.on_completion() == OnComplete.CloseOut, handle_closeout],
        [Txn.on_completion() == OnComplete.UpdateApplication, handle_updateapp],
        [Txn.on_completion() == OnComplete.DeleteApplication, handle_deleteapp]
    )
    return program

if __name__ == "__main__":
    print(compileTeal(approval_program(), Mode.Application, version=5))
