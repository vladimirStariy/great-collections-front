import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === "object" && error != null && "status" in error;
}

export const isErrorWithMessage = (error: unknown): error is { message: string, error: string, statusCode: number } => {
    return (
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        typeof (error as any).message === "string"
    );
}
