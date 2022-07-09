export interface ActivityRegistrationEntity {
    id?: string;
    userId: string;
    activityName: string;
    activityDate: string;
    activityStartTime: string;
    activityDuration: number;
    activityDistance?: number;
    activitySpeed?: number;
    activityComment?: string;
}
