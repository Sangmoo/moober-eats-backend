import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions } from './mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions, // private readonly configService: ConfigService,
  ) {
    // Check Account Setting Error Handling
    this.sendEmail('testing', 'testContent')
      .then(() => {
        console.log('Message sent');
      })
      .catch(error => {
        console.log(error.response.body);
      });
  }

  // After Add toEmail
  private async sendEmail(subject: string, template: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `first_1st@naver.com`);
    form.append('subject', subject);
    // form.append('text', content);
    form.append('template', template);
    form.append('v:code', 'tCode275');
    form.append('v:username', 'Sangmoo');
    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
    console.log(response.body);
  }
}
