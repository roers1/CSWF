import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Project } from '../models/project';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectRoute = 'https://svl-projects-api.herokuapp.com/project'
  // projectRoute = 'http://localhost:3000/project'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'password': 'KIEZ1234'
    }),
  };

  constructor(private http: HttpClient) { }

  retrieveProjects(cb) {
    this.http.get(this.projectRoute, this.httpOptions)
    .subscribe(
      res => { 
        cb(res) },
      error => { cb(error) }
    )
  }

  retrieveProjectById(id: string, cb) {
    this.http.get(this.projectRoute + "/" + id, this.httpOptions)
      .subscribe(
        res => { cb(res) },
        error => { cb(error) }
      )
  }

  createProject(project: Project, cb) {
    project._id = undefined
    const body = JSON.stringify(project)

    this.http.post(this.projectRoute, body, this.httpOptions)
      .subscribe(
        res => { cb(res) },
        error => { cb(error) }
      )
  }

  updateProject(project: Project, cb) {
    const body = JSON.stringify(project)

    this.http.put(this.projectRoute + "/" + project._id, body, this.httpOptions)
      .subscribe(
        res => { cb(res) },
        error => { cb(error) }
      )
  }

  removeProject(project: Project, cb) {
    this.http.delete(this.projectRoute + "/" + project._id, this.httpOptions)
    .subscribe(
      res => { cb(res) },
      error => { cb(error) }
    )
  }

  convertListToMap(languagesList: Language[], projectsList: Project[]): Map<Language, []> {

    console.log(languagesList)
    console.log(projectsList)

    let projectsMap = new Map()

    languagesList.forEach(language => {
      projectsMap.set(language, [])
    });

    projectsList.forEach(project => {
      projectsMap.get(this.getLanguageFromProject(project, languagesList)).push(project)
    });

    return projectsMap
  }

  getLanguageFromProject(project: Project, languageList: Language[]): Language {
    let language

    languageList.forEach(templanguage => {
      if(templanguage._id == project.languageId) {
        language = templanguage
      }
    });

    return language
  }
}
