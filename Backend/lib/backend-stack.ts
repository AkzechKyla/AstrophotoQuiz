import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeJsLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as eventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'BackendQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }

  private createAuthLambda(): void {
    const authLambda = new nodeJsLambda.NodejsFunction(this, 'authLambda', {
      entry: `${__dirname}/../src/lambda/authLambda.ts`,
      functionName: "authFunction",
      handler: 'authLambdaHandler',
      memorySize: 1024,
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(900),
      tracing: lambda.Tracing.ACTIVE,
      bundling: {
        minify: true,
      },
      environment: {
        // ENABLE_OTEL_DEBUG_LOGS: 'true',
        // ENABLE_OTEL_DEBUG_METRICS_LOGS: 'true',
      },
    });
    authLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['sts:AssumeRole'],
        effect: Effect.ALLOW,
        resources: ["*"],
      }),
    );
    authLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['ssm:GetParameter'],
        effect: Effect.ALLOW,
        resources: ["*"],
      }),
    )
    authLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['sqs:SendMessage'],
        effect: Effect.ALLOW,
        resources: ["*"],
      }),
    )
  }
}
