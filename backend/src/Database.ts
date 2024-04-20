//Source code generated by AppGPT (www.appgpt.tech)

//Class to create tables and seed new database
import { DataSource } from 'typeorm';
import { DBConfiguration } from './Configuration';
import { SettingsEntity } from './db/Settings.entity';
//autogenerate imports based on resources
import { PlayerEntity } from './db/Player.entity';
import { BubbleEntity } from './db/Bubble.entity';
import { ScoreEntity } from './db/Score.entity';

export class Database {
  static dbConfiguration: DBConfiguration;
  public static ds: DataSource;

  static async Initialize(dbConfiguration: DBConfiguration) {
    Database.dbConfiguration = dbConfiguration;
    let dbConfig: any = dbConfiguration as any;
    //Autogenerate entities array from resource names

    dbConfig.entities = [
      SettingsEntity,
      PlayerEntity,
      BubbleEntity,
      ScoreEntity,
    ];
    Database.ds = new DataSource(dbConfig);
    await Database.ds.initialize();

    //TODO: Drop all tables

    await Database.Seed();
  }
  static async Seed() {
    let data: any = {
      Player: [
        { shooting: false, id: 71 },
        { shooting: false, id: 95 },
        { shooting: false, id: 57 },
        { shooting: true, id: 81 },
        { shooting: false, id: 71 },
      ],
      Bubble: [
        { position: 'position 1', color: 'color 1', size: 1, id: 22 },
        { position: 'position 2', color: 'color 2', size: 2, id: 38 },
        { position: 'position 3', color: 'color 3', size: 3, id: 19 },
        { position: 'position 4', color: 'color 4', size: 4, id: 97 },
        { position: 'position 5', color: 'color 5', size: 5, id: 5 },
      ],
      Score: [
        { currentScore: 1, highScore: 1, level: 1, id: 51 },
        { currentScore: 2, highScore: 2, level: 2, id: 95 },
        { currentScore: 3, highScore: 3, level: 3, id: 67 },
        { currentScore: 4, highScore: 4, level: 4, id: 13 },
        { currentScore: 5, highScore: 5, level: 5, id: 55 },
      ],
    };
    //Autogenerate multiple such calls ie for each resource and its data object
    let isSeeded = await this.IsSeeded();
    //if (!isSeeded) {
    //forcing app recreation
    if (true) {
      console.log('   Seeding database...');
      await this.SeedResource('PlayerEntity', data.Player);
      await this.SeedResource('BubbleEntity', data.Bubble);
      await this.SeedResource('ScoreEntity', data.Score);
      await this.SeedResource('SettingsEntity', {
        settingname: 'isSeeded',
        settingvalue: 'true',
      });
    } else {
      console.log('   Database seeded already!');
    }
  }
  static async IsSeeded() {
    const repo = Database.ds.getRepository('SettingsEntity');
    let rec: any = await repo.findOne({
      select: {
        settingname: true,
        settingvalue: true,
      },
      where: {
        settingname: 'isSeeded',
      },
    });
    if (rec && rec.settingvalue) return true;
    return false;
  }
  static async SeedResource(resourceName: any, resourceData: any) {
    const repo = Database.ds.getRepository(resourceName);
    //await repo.clear();
    console.log('   Seeding table ' + resourceName);
    await repo.upsert(resourceData, ['id']);
  }
}
